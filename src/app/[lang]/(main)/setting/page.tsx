"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import SettingTabs from "./components/SettingTabs";
import BigFileInput from "@/components/input/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";

export default function SettingPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = getDictionary(lang);
  return (
    <PrimaryCard
      headerContent={<SettingTabs />}
      content={
        <form>
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 pb-12 md:grid-cols-3">
              <div className="grid grid-cols-1">
                <BigFileInput
                  label="Upload Logo Griya"
                  onChange={(e) => {}}
                  value={""}
                />
              </div>

              <div className="grid max-w-2xl gap-x-4 gap-y-1 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-3">
                  <PrimaryInput
                    value={""}
                    name="Nama Griya"
                    type="text"
                    placeholder="Nama Griya"
                    className="w-100"
                    onChange={() => {}}
                  />
                </div>

                <div className="sm:col-span-3">
                  <PrimaryInput
                    value={""}
                    name="Email Griya"
                    type="text"
                    placeholder="griya@domain.com"
                    className="w-100"
                    onChange={() => {}}
                  />
                </div>
                <div className="sm:col-span-3">
                  <PrimaryInput
                    value={""}
                    name="No. Telp Griya"
                    type="text"
                    placeholder="+62 819 3343 8182"
                    className="w-100"
                    onChange={() => {}}
                  />
                </div>

                <div className="sm:col-span-3">
                  <PrimaryInput
                    value={""}
                    name="Alamat Griya"
                    type="text"
                    placeholder="Jl. Denpasar Gilimanuk"
                    className="w-100"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      }
      footerContent={
        <div className="my-4 flex items-center justify-end gap-x-6">
          <PrimaryButton
            label="Simpan"
            onClick={() => {}}
            className="rounded-md bg-primary1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1"
          />
        </div>
      }
    />
  );
}
