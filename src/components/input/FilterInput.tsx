import { ReactElement, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Interval } from "@/types";

interface IFilterInputProps {
  value: string;
  query: string;
  label: string;
  filter: Interval[];
  setValue: (value: string) => void;
  setQuery: (value: string) => void;
  setPage: (value: number) => void;
}

const FilterInput = ({ props }: { props: IFilterInputProps }): ReactElement => {
  const { value, query, label, filter, setValue, setQuery, setPage } = props;

  return (
    <div className="flex flex-col w-full">
      <p className="capitalize text-gray-500 mb-2 text-right text-sm">
        Filter {label}
      </p>
      <Combobox
        value={value}
        onChange={(value) => {
          setValue(value ?? "");
          setPage(1);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm rounded-md">
            <Combobox.Input
              className="flex w-full capitalize border-none py-1 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(value: string) => value.replaceAll("_", " ")}
              placeholder={label}
              id={label}
              name={label}
              onChange={(event) => {
                setQuery(event.target.value.replaceAll("_", " "));
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 px-2 flex items-center bg-primary1  ">
              <ChevronDownIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {filter?.length === 0 && query !== "" ? (
              <div className="absolute bg-white w-full cursor-default select-none px-4 py-2 text-gray-700 shadow-lg ring-1 ring-black/5">
                Nothing found.
              </div>
            ) : (
              <Combobox.Options
                className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                style={{ zIndex: 1 }}
              >
                {filter.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary2 text-white" : "text-gray-900"
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate capitalize ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name.replaceAll("_", " ")}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default FilterInput;
