// import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import React, { MouseEventHandler, ReactElement } from "react";
// import Pagination from "../mini/Pagination";
// import PrimaryWithIconButton from "../button/PrimaryWithIconButton";
// import Divider from "../mini/Divider";

// interface PrimaryTableBodyProps {
//   title?: string;
//   mainActionTitle?: string;
//   mainActionOnClick?: MouseEventHandler<HTMLButtonElement>;
//   actions?: ReactElement;
//   filters?: ReactElement;
//   onFilterReset?: () => void;
// }

// const PrimaryTableBody = ({
//   title,
//   mainActionTitle,
//   mainActionOnClick,
//   actions,
//   filters,
//   onFilterReset,
// }: PrimaryTableBodyProps) => {
//   return (
//     <div
//       className="bg-white rounded-xl  w-full"
//       style={{ boxShadow: "0 0px 5px rgba(209, 213, 219, 0.6)" }}
//     >
//       <div className="px-8 py-6 flex flex-row justify-between w-full items-center">
//         <h2 className="font-bold text-primary1">{title}</h2>

//         {actions ?? (
//           <PrimaryWithIconButton
//             label={mainActionTitle ?? ""}
//             onClick={(e) => {
//               if (mainActionOnClick) {
//                 mainActionOnClick(e);
//               }
//             }}
//             icon={PlusIcon}
//           />
//         )}
//       </div>
//       <Divider />

//       <div className="py-8">
//         <div>
//           <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
//             <div className="sm:flex-auto">
//               {onFilterReset ? (
//                 <button
//                   onClick={() => {
//                     onFilterReset();
//                   }}
//                   className="flex flex-row items-center hover:text-gray-900"
//                 >
//                   <XMarkIcon width={16} height={16} color="gray" />
//                   <p className="text-sm font-semibold leading-6 text-gray-600 underline hover:text-gray-900">
//                     Reset
//                   </p>
//                 </button>
//               ) : null}
//             </div>
//             <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
//               {filters}
//             </div>
//           </div>
//           <div className="mt-8 flow-root">
//             <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//               <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                 <table className="min-w-full divide-y divide-gray-300">
//                   <thead>
//                     <tr>
//                       <th
//                         scope="col"
//                         className="py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-8 w-1/2"
//                       >
//                         Upacara
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
//                       >
//                         Kategori
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
//                       >
//                         Aksi
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {data.map((item, index) => (
//                       <tr key={`${index}`} className="even:bg-gray-50">
//                         <td className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
//                           <div className="flex flex-row space-x-4 ">
//                             <Image
//                               alt={item.title}
//                               src={item.thumbnailUrl}
//                               className="h-10 w-10 rounded-full bg-gray-50 object-cover"
//                               height={40}
//                               width={40}
//                               objectFit="cover"
//                             />
//                             <div>
//                               <p className="font-bold">{item.title}</p>
//                               <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
//                                 {item.description}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {item.kategori}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           <Field className="flex items-center bg-gray-100 p-2 rounded-full">
//                             <Switch
//                               checked={item.status}
//                               className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary1 focus:ring-offset-2 data-[checked]:bg-primary1"
//                             >
//                               <span
//                                 aria-hidden="true"
//                                 className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
//                               />
//                             </Switch>
//                             <Label as="span" className="ml-3 text-sm">
//                               {item.status ? (
//                                 <span className="font-medium text-gray-900">
//                                   Aktif
//                                 </span>
//                               ) : (
//                                 <span className="font-medium text-gray-400">
//                                   Non-Aktif
//                                 </span>
//                               )}
//                             </Label>
//                           </Field>
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           <div className="flex flex-row space-x-2">
//                             <button className="p-2 bg-emerald-100 rounded-lg hover:bg-emerald-200">
//                               <PencilSquareIcon
//                                 color="green"
//                                 height={22}
//                                 width={22}
//                               />
//                             </button>
//                             <button className="p-2 bg-rose-100 rounded-lg hover:bg-rose-200">
//                               <TrashIcon color="red" height={22} width={22} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <Pagination />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrimaryTableBody;
