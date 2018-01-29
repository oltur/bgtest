$(document).ready(function () {
  // Place JavaScript code here...

  document.querySelector("#importGo")
    .addEventListener("click", (event) => {
      const url = `/api/importorders`;

      fetch("/data/sample.json")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const str = JSON.stringify(data);
          return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
              "Content-Type": "application/json"
            })
          });
        })
        .then(response => {
          return response.text();
        })
        .then(data => {
          document.querySelector("#importResult").value = data;
        });
    });

  document.querySelector("#companyNameGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/?$where=this.companyName==="${document.querySelector("#companyNameSearch").value}"`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          document.querySelector("#companyNameResult").value = JSON.stringify(data);
        });
    });

  document.querySelector("#customerAddressSearchGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/?$where=this.customerAddress==="${document.querySelector("#customerAddressSearch").value}"`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          document.querySelector("#addressResult").value = JSON.stringify(data);
        });
    });

  document.querySelector("#groupSortGo")
    .addEventListener("click", (event) => {
      const url = `/api/ordersCountPerItem`;

      fetch(url)
        .then(response => {
          return response.text();
        })
        .then(data => {
          document.querySelector("#groupSortResult").value = data;
        });
    });

});