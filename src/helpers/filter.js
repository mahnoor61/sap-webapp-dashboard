// const FilterHelper = (dataArr = [], query = '', properties = []) => dataArr.filter(data => {
//   // console.log("data", data)
//   if (query) {
//     let queryMatched = false;
//
//     properties.forEach(property => {
//       if (data[property] && (data[property]).toLowerCase().includes(query.toLowerCase())) {
//         queryMatched = true;
//       }
//     });
//
//     if (!queryMatched) {
//       return false;
//     }
//   }
//
//   return true;
// });
//
// const PaginationHelper = (dataArr, page, rowsPerPage) => dataArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//
// const UpdateState =(dataArr, id)=> dataArr.filter((data) => data._id !== id);
//
// module.exports = {FilterHelper, PaginationHelper , UpdateState};
//
// export default FilterHelper;
const FilterHelper = (dataArr = [], query = '', properties = []) => {
  return dataArr.filter(data => {
    if (!query) return true; // If no query, return all items

    let queryMatched = false;

    // Loop through the properties to check if the query matches any property
    properties.forEach(property => {
      let value = data;

      // Check if the property is nested (contains a dot)
      if (property.includes('.')) {
        const keys = property.split('.');

        // Traverse the object to get the final value
        keys.forEach(key => {
          if (value && value.hasOwnProperty(key)) {
            value = value[key];
          } else {
            value = undefined;
          }
        });
      } else {
        value = data[property]; // Directly get value for non-nested property
      }

      // Check if the final value matches the query (productionOrderNo)
      if (property === 'productionOrderNo' && typeof value === 'number') {
        if (value.toString().includes(query)) {
          queryMatched = true;
        }
      }

      // Or check if it's a string (for other properties)
      else if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
        queryMatched = true;
      }
    });

    return queryMatched;
  });
};

// const FilterHelper = (dataArr = [], query = '', properties = []) => {
//   return dataArr.filter(data => {
//     if (!query) return true; // If no query, return all items
//     console.log("dataArr",dataArr)
//     let queryMatched = false;
//
//     properties.forEach(property => {
//       let value = data;
//
//       // Check if the property is nested (contains a dot)
//       if (property.includes('.')) {
//         const keys = property.split('.');
//
//         // Traverse the object to get the final value
//         keys.forEach(key => {
//           if (value && value.hasOwnProperty(key)) {
//             value = value[key];
//           } else {
//             value = undefined;
//           }
//         });
//       } else {
//         value = data[property]; // Directly get value for non-nested property
//       }
//
//       // Check if the final value is a string and matches the query
//       if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
//         queryMatched = true;
//       }
//     });
//
//     return queryMatched;
//   });
// };

const PaginationHelper = (dataArr, page, rowsPerPage) =>
  dataArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const UpdateState = (dataArr, id) =>
  dataArr.filter(data => data._id !== id);

module.exports = { FilterHelper, PaginationHelper, UpdateState };
export default FilterHelper;
