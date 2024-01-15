import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {formatDateToNormalWithTime} from "../utils/formatDate";
import {createBackupFile, exportView, getBackupFiles, restoreDbFromBak} from "../http/backupAPI";
import LoadModal from "../components/modals/LoadModal";
import ExportViewModal from "../components/modals/ExportViewModal";

const OtherConfig = () => {
    const [bakFiles, setBakFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    const handleCloseExportModal = () => {
        setShowExportModal(false);
    }

    const backup = () => {
        if (!window.confirm('Вы уверены, что хотите сделать резервное копирование всей Базы данных?')) return;
        setLoading(true);
        createBackupFile()
            .then(data => {
                window.alert(data);
                getFiles()
                setLoading(false);
            })
            .catch(err => {
                window.alert('Ошибка');
                console.log(err);
                setLoading(false);
            })
    }

    function exportToCsv() {
        setShowExportModal(true);
    }

    const getFiles = () => {
        getBackupFiles()
            .then(data => {
                setBakFiles(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getFiles();
    }, []);

    const restoreDb = (selectedBakFile) => {
        if (!window.confirm(`Вы уверены, что хотите восстановить БД по файл ${selectedBakFile.name}
        \n!!!Все подключенные сессии к бд будут закрыты. Это может привести к непредвиденным ошибкам.`)) return;
        setLoading(true);
        restoreDbFromBak(selectedBakFile.name + selectedBakFile.extension)
            .then(data => {
                window.alert(data);
                setLoading(false);
            })
            .catch(err => {
                window.alert('Ошибка');
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <Container>
            <h2>Резервное копирование</h2>
            <Button variant={"outline-light"} onClick={backup}>Создать bak файл</Button>
            <Button variant={"outline-light"} className={"ml-4"} onClick={exportToCsv}>Сделать экспорт csv</Button>
            <Table className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Файл</th>
                    <th>Расширение</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {bakFiles.map((file, index) =>
                    <tr key={file.name}>
                        <td>{index + 1}</td>
                        <td>{file.name}</td>
                        <td>{file.extension}</td>
                        <td>{formatDateToNormalWithTime(file.creationTime)}</td>
                        <td>{formatDateToNormalWithTime(file.lastWriteTime)}</td>
                        <td>
                            <Button variant={"outline-warning"} onClick={() => restoreDb(file)}>Сделать backup</Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            <ExportViewModal show={showExportModal} onHide={handleCloseExportModal} setLoading={setLoading}/>
            <LoadModal show={loading}/>
        </Container>
    );
};

export default OtherConfig;