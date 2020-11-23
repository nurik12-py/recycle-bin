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
            return "- пустой контейнер";
        } else if (status === 1) {
            return "- средний контейнер";
        } else {
            return "- полный контейнер";
        }
    }

    const getDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    const content = `
        <h3>${location.name}</h3>
        <p style="color: #222222; font-size: 18px"> <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash" fill="#9A9A9A" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg> ${getStatus(location.status)}</p>
        <div class="d-flex justify-content-center align-items-center">
            <div class="mr-2">
                <p class="m-0"><b>Дата последней выгрузки:</b></p>
                <p class="m-0" style="color: #B0B0B0">${location.logs.length > 0 ? getDate(location.logs[0]["loadingDate"]) : "Пока нет данных"}</p>
            </div>
            <div>
                <a href="/history/${location.phoneNumber}" class="btn btn-outline-secondary btn-sm"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock-history" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
              </svg> История выгрузки</a>
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