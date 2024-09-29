// "use client";

// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const options: Highcharts.Options = {
//   chart: {
//     type: "area",
//   },
//   accessibility: {
//     description: "Transaksi dalam Griya",
//   },
//   title: {
//     text: "Statistik Transaksi",
//   },
//   xAxis: {
//     accessibility: {
//       rangeDescription: "Range: January to December",
//     },
//   },
//   yAxis: {
//     title: {
//       text: "Jumlah Transaksi",
//     },
//   },
//   tooltip: {
//     pointFormat:
//       "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>" +
//       "warheads in {point.x}",
//   },
//   plotOptions: {
//     area: {
//       pointStart: 1,
//       color: "orange",
//       fillColor: "orange",
//       marker: {
//         enabled: false,
//         symbol: "circle",
//         radius: 2,
//         states: {
//           hover: {
//             enabled: true,
//           },
//         },
//       },
//     },
//   },
//   series: [
//     {
//       name: "Bulan",
//       data: [0, 0, 0, 0, 0, 2, 9, 13, 50, 170, 299, 438],
//     },
//   ],
// };

// const TransactionChart = () => {
//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default TransactionChart;
