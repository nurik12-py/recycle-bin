const getImageHref = (level) => {
    if (level === 0) {
        return 'https://firebasestorage.googleapis.com/v0/b/portfolio-f75cb.appspot.com/o/Component%204.png?alt=media&token=c7a77755-93a9-484f-9d32-efb2af1dadc0';
    } else if (level === 1) {
        return 'https://firebasestorage.googleapis.com/v0/b/portfolio-f75cb.appspot.com/o/Component%206.png?alt=media&token=023e413e-a4f4-4741-b1e1-c3408c6abd01';
    } else {
        return "https://firebasestorage.googleapis.com/v0/b/portfolio-f75cb.appspot.com/o/Component%201.png?alt=media&token=76c4da4b-dd02-4542-9941-c382b4915be7";
    }
}

export const getLocationFeature = (location, id) => {
    const getStatus = (status) => {
        if (status === undefined) {
            return "Нет данных";
        }
        if (status === 0) {
            return "Уровень низкий";
        } else if (status === 1) {
            return "Уровень средний";
        } else {
            return "Уровень высокий";
        }
    }

    const getDate = (dateString) => {
        const date = new Date(dateString);
        return date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
    }

    const content = `
        <h3>${location.name}</h3>
        <h6><b>${getStatus(location.status)}</b></h6>
        <div class="d-flex justify-content-center align-items-center">
            <div class="mr-2">
                <h6 class="m-0">Дата последней выгрузки:</h6>
                <p class="m-0">${location.logs.length > 0 ? getDate(location.logs[0]["loadingDate"]) : "Пока нет данных"}</p>
            </div>
            <div>
                <a href="/history/${location.phoneNumber}" class="btn btn-outline-info btn-sm">История выгрузки</a>
            </div>
        </div>
    `;
    const options = {
        iconLayout: 'default#image',
        iconImageHref: getImageHref(location.status),
        iconImageSize: [35, 35],
        iconImageOffset: [-17.5, -17.5]
    }
    const defaultProps = {
        hintContent: getStatus(location.status),
        balloonContentBody: content,
    };

    const placeMark = {
        type: "Feature",
        id: id,
        geometry: {
            type: "Point",
            coordinates: [location.lon, location.lat]
        },
        properties: defaultProps,
        options: options,
    }
    return placeMark;
}