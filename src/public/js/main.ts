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

  document.querySelector("#createGo")
    .addEventListener("click", (event) => {
      const orderId = document.querySelector("#orderId").value;
      const companyName = document.querySelector("#companyName").value;
      const customerAddress = document.querySelector("#customerAddress").value;
      const orderedItem = document.querySelector("#orderedItem").value;
      const url = `/api/order`;
      const data = JSON.stringify({ orderId: orderId, companyName: companyName, customerAddress: customerAddress, orderedItem: orderedItem });

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          document.querySelector("#createResult").value = data;
        });
    });

  document.querySelector("#updateGo")
    .addEventListener("click", (event) => {
      const orderId = document.querySelector("#orderIdUpdate").value;
      const companyName = document.querySelector("#companyNameUpdate").value;
      const customerAddress = document.querySelector("#customerAddressUpdate").value;
      const orderedItem = document.querySelector("#orderedItemUpdate").value;
      const url = `/api/order`;
      const data = JSON.stringify({ orderId: orderId, companyName: companyName, customerAddress: customerAddress, orderedItem: orderedItem });

      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          document.querySelector("#updateResult").value = data;
        });
    });

  document.querySelector("#deleteGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/${document.querySelector("#idDelete").value}`;
      fetch(url, {
        method: "DELETE"
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          document.querySelector("#deleteResult").value = JSON.stringify(data);
        });
    });

});