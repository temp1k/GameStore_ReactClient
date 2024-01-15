export const formatDate = (dateString) => {
    // Создание объекта Date из строки
    let date = new Date(dateString);

// Форматирование даты для использования в input типа date
     // преобразуем дату в формат YYYY-MM-DD
    return date.toDateString().split('T')[0];
}

const getDateObject = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate() - 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return {
        day: day,
        month: month,
        year: year,
        hours,
        minutes
    }
}

export const formatDateToNormal = (dateString) => {
    const date = getDateObject(dateString);
    return date.day + "." + date.month + "." + date.year;
}

export const formatDateToNormalWithTime = (dateString) => {
    const date = getDateObject(dateString);
    return date.day + '.' + date.month + '.' + date.year + ' ' + date.hours + ':' + date.minutes;
}

export const formatDateToInput = (dateString) => {
    const date = getDateObject(dateString);

    return date.year + '-' + date.month + '-' + date.day;
}

