"use client";

import { useState } from "react";

import CTA from "@/app/components/common/CTA";
import DropDown from "@/app/components/common/DropDown";
import Modal from "@/app/components/common/Modal";
import TabToggle from "@/app/components/common/TabToggle";

const PART_TABS = [
  { label: "Front-End", value: "frontend" },
  { label: "Back-End", value: "backend" },
];

const TEAM_NAMES = [
  { label: "Ditda", value: "ditda" },
  { label: "Groupeat", value: "groupeat" },
  { label: "IPX", value: "ipx" },
  { label: "Jobdri", value: "jobdri" },
  { label: "CONX", value: "conx" },
];

type ModalState = null | "confirm" | "success";

const Page = () => {
  const [part, setPart] = useState("frontend");
  const [selected, setSelected] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  const selectedLabel = TEAM_NAMES.find(o => o.value === selected)?.label ?? "";

  const handlePartChange = (value: string) => {
    setPart(value);
    setSelected("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-heading1-sb text-black md:text-[40px] md:leading-[135%] md:font-semibold md:tracking-[-0.8px]">
        🏆<span className="text-purple-60">2026</span> CEOS <br />
        23RD AWARDS
      </h1>
      <TabToggle tabs={PART_TABS} value={part} onChange={handlePartChange} />
      <DropDown
        options={TEAM_NAMES}
        value={selected}
        onChange={setSelected}
        placeholder="팀 선택"
      />
      <CTA label="투표하기" disabled={!selected} onClick={() => setModal("confirm")} />

      {modal === "confirm" && (
        <Modal
          buttons="double"
          title="투표하시겠습니까?"
          description={`${selectedLabel}에 투표합니다. 분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다.`}
          leftLabel="아니오"
          rightLabel="예"
          onClose={() => setModal(null)}
          onCancel={() => setModal(null)}
          onConfirm={() => setModal("success")}
        />
      )}
      {modal === "success" && (
        <Modal
          buttons="single"
          title="투표가 완료되었습니다!"
          rightLabel="확인"
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default Page;
