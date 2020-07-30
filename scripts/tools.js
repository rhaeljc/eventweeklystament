async function getData(endpoint) {
    let eventdata = ''
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": endpoint,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "_view": "event_payment",
            "_run_calcfields": true
        }
    }

    await $.ajax(settings).done(function (response) {
        eventdata = response
    });
    return eventdata
}

async function transfromData(data) {
    let eventdata = data;
    let venue_name = '',
        total_gross_amount = 0
        , total_service_fee = 0
        , total_net_amount = 0
        , event_month_name = ''
        , event_year = ''
        , event_week = ''
        , filtered_week = ''
        , plural = ''
        ,period=''
        bottomLabelHeader='Powered By'
        bottomLabelText ='www.valetautomatation.com'
        ;
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    if (eventdata && eventdata.data) {
        venue_name = eventdata.data[0].venue_name;

        event_month_name = eventdata.data[0].event_month_name;
        event_year = eventdata.data[0].event_year;
        event_week = eventdata.data[0].event_week;
        filtered_week = eventdata.data[0].filtered_week;
        period=eventdata.data[0].period;
        plural = filtered_week == 'ALL' ? 'S' : '';
        eventdata.data.forEach(element => {
            total_gross_amount += element.gross_amount;
            total_service_fee += element.service_fee;
            total_net_amount += element.net_amount;
            element.gross_amount = formatter.format(element.gross_amount);
            element.service_fee = formatter.format(element.service_fee);
            element.net_amount = formatter.format(element.net_amount);
        });

    }
    total_gross_amount = formatter.format(total_gross_amount)
    total_service_fee = formatter.format(total_service_fee);
    total_net_amount = formatter.format(total_net_amount);
    let proccessData = {
        venue_name,
        filtered_week,
        event_month_name,
        period,
        plural,
        event_year,
        event_week,
        total_gross_amount,
        total_service_fee,
        total_net_amount,
        bottomLabelHeader,
        bottomLabelText,
        "data": eventdata.data
    }
    return proccessData;
}

async function GetTemplate(path) {
    let htmlTemplate = ''
    await $.get(path, function (template) {

        htmlTemplate = template
    });
    return htmlTemplate;
}
async function showInfo(path, endpoint) {

    let data = await getData(endpoint);
    let proccessedData = await transfromData(data);
    let template = await GetTemplate(path)
    return await renderTemplate(template, proccessedData);
}
async function renderTemplate(template, data) {
    return await Mustache.render(template, data);
}
async function saveAsPDF(hmtl) {
    html2pdf()
    .from(eventWeeklyStament)
    .save();
}