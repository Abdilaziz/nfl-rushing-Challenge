
// Datatables API: https://datatables.net/reference/option/

let initTable = () => {
    $('#rushingDataTable').DataTable({
        serverSide: true,
        processing: true,
        paging: true,
        info: true,
        pagingType: "numbers",
        pageLength: 10,
        scrollY: "500px",
        scrollCollapse: true, //limit height when number of rows is small
        searchDelay: 400,
        language: {
            info: "_START_ to _END_ of _TOTAL_ Players is Shown",
            infoFiltered: " - Filtered from a total of _MAX_ players",
            search: "Filter by Player Name:",
            zeroRecords: "No player rushing statistics to display"
        },
        ajax: {
            url: '/football/rushing',
            dataType: "json",
            contentType: "application.json; charset=utf-8",
            data: function(data) {
                // console.log(data);
                let query_params = {};

                query_params.sort = data.columns[data.order[0].column].data;
                query_params.orderBy = data.order[0].dir;
                query_params.limit = data.length;
                query_params.offset = data.start;
                query_params.playerFilter = data.search.value;

                // console.log(query_params);
                return query_params;  
            },
        },
        columns: [
            {
                data: "Player",
                title: "Player",
            },
            {
                data: "Team",
                title: "Team",
                orderable: false
            },
            {
                data: "Pos",
                title: "Pos",
                orderable: false
            },
            {
                data: "Att",
                title: "Att",
                orderable: false
            },
            {
                data: "Att/G",
                title: "Att/G",
                orderable: false
            },
            {
                data: "Yds",
                title: "Yds",
            },
            {
                data: "Avg",
                title: "Avg",
                orderable: false
            },
            {
                data: "Yds/G",
                title: "Yds/G",
                orderable: false
            },
            {
                data: "TD",
                title: "TD",
            },
            {
                data: "Lng",
                title: "Lng",
            },
            {
                data: "1st",
                title: "1st",
                orderable: false
            },
            {
                data: "1st%",
                title: "1st%",
                orderable: false
            },
            {
                data: "20+",
                title: "20+",
                orderable: false
            },
            {
                data: "40+",
                title: "40+",
                orderable: false
            },
            {
                data: "FUM",
                title: "FUM",
                orderable: false
            },
        ],
    });

    // in order to add total number of records and filterd number, we need to use this event listener
    $('#rushingDataTable')
          .on('xhr.dt', function ( e, settings, json, xhr ) {
              json.recordsTotal = json.total;
              json.recordsFiltered = json.filteredTotal;
          });
    $('.dataTables_length').addClass('bs-select');
}

$(document).ready(function () {
    initTable();
});
