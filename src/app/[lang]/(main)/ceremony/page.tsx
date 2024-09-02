import { PlusIcon } from "@heroicons/react/20/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";

export default async function Ceremony({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);

  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
      <div className="bg-white rounded-xl shadow-gray-100 shadow-md w-full">
        <div className="p-8 flex flex-row justify-between w-full items-center border-b-2 border-b-gray-100">
          <h2 className="font-bold text-primary1">Upacara Agama</h2>

          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-primary1 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prbg-primary1"
          >
            <PlusIcon
              aria-hidden="true"
              className="-mr-0.5 h-5 w-5"
              color="white"
            />
            Tambah Upacara
          </button>
        </div>

        <div className="py-8">
          <div>
            <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
              {/* <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Rese
                </h1>
              </div> */}
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                {/* <PrimaryInput name="search" onChange={(e) => {}} value={""} /> */}
              </div>
            </div>
            <div className="mt-8 flow-root px-8">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {people.map((person) => (
                        <tr key={person.email} className="even:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">, {person.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
