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
          (<HTMLInputElement>document.querySelector("#importResult")).value = data;
        });
    });

  document.querySelector("#companyNameGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/?$where=this.companyName==="${ (<HTMLInputElement>document.querySelector("#companyNameSearch")).value}"`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          (<HTMLInputElement>document.querySelector("#companyNameResult")).value = JSON.stringify(data);
        });
    });

  document.querySelector("#customerAddressSearchGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/?$where=this.customerAddress==="${ (<HTMLInputElement>document.querySelector("#customerAddressSearch")).value}"`;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          (<HTMLInputElement>document.querySelector("#addressResult")).value = JSON.stringify(data);
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
          (<HTMLInputElement>document.querySelector("#groupSortResult")).value = data;
        });
    });

  document.querySelector("#createGo")
    .addEventListener("click", (event) => {
      const orderId =  (<HTMLInputElement>document.querySelector("#orderId")).value;
      const companyName =  (<HTMLInputElement>document.querySelector("#companyName")).value;
      const customerAddress =  (<HTMLInputElement>document.querySelector("#customerAddress")).value;
      const orderedItem =  (<HTMLInputElement>document.querySelector("#orderedItem")).value;
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
          (<HTMLInputElement>document.querySelector("#createResult")).value = data;
        });
    });

  document.querySelector("#updateGo")
    .addEventListener("click", (event) => {
      const orderId =  (<HTMLInputElement>document.querySelector("#orderIdUpdate")).value;
      const companyName =  (<HTMLInputElement>document.querySelector("#companyNameUpdate")).value;
      const customerAddress =  (<HTMLInputElement>document.querySelector("#customerAddressUpdate")).value;
      const orderedItem =  (<HTMLInputElement>document.querySelector("#orderedItemUpdate")).value;
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
          (<HTMLInputElement>document.querySelector("#updateResult")).value = data;
        });
    });

  document.querySelector("#deleteGo")
    .addEventListener("click", (event) => {
      const url = `/api/order/${ (<HTMLInputElement>document.querySelector("#idDelete")).value}`;
      fetch(url, {
        method: "DELETE"
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          (<HTMLInputElement>document.querySelector("#deleteResult")).value = data;
        });
    });

});