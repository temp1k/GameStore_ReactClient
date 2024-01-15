import React from 'react';
import {Dropdown} from "react-bootstrap";
import {set} from "mobx";

const SelectComponent = ({values, selectedValue, setSelectedValue, placeholder}) => {
    return (
        <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{selectedValue.fullName || placeholder}</Dropdown.Toggle>
            <Dropdown.Menu>
                {values.map(val =>
                    <Dropdown.Item
                        onClick={() => setSelectedValue(val)}
                        key={val.id}>{val.fullName}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SelectComponent;