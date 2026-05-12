"use client";

import { useState } from "react";

import CTA from "@/app/components/common/CTA";
import DropDown from "@/app/components/common/DropDown";
import InputField from "@/app/components/common/InputField";
import Modal from "@/app/components/common/Modal";
import TabToggle from "@/app/components/common/TabToggle";

const PART_TABS = [
  { label: "Front-End", value: "frontend" },
  { label: "Back-End", value: "backend" },
];

const TEAM_OPTIONS = [
  { label: "Ditda", value: "ditda" },
  { label: "Groupeat", value: "groupeat" },
  { label: "IPX", value: "ipx" },
  { label: "Jobdri", value: "jobdri" },
  { label: "CONX", value: "conx" },
];

type ModalState = null | "confirm" | "alert";

const Page = () => {
  const [tab, setTab] = useState("frontend");
  const [dropdown, setDropdown] = useState("");
  const [input, setInput] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-3">
        <p className="text-heading3-sb">TabToggle</p>
        <TabToggle tabs={PART_TABS} value={tab} onChange={setTab} />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-heading3-sb">DropDown</p>
        <DropDown
          options={TEAM_OPTIONS}
          value={dropdown}
          onChange={setDropdown}
          placeholder="팀 선택"
        />
      </section>

      <section className="flex flex-col gap-4">
        <p className="text-heading3-sb">InputField</p>
        <InputField
          placeholder="기본 인풋"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <InputField
          placeholder="에러 인풋"
          errorMessage="문자, 숫자, 특수문자를 모두 포함해주세요."
        />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-heading3-sb">CTA</p>
        <CTA label="활성화" onClick={() => setModal("confirm")} />
        <CTA label="비활성화" disabled />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-heading3-sb">Modal</p>
        <CTA label="confirm 모달" onClick={() => setModal("confirm")} />
        <CTA label="alert 모달" onClick={() => setModal("alert")} />
      </section>

      {modal === "confirm" && (
        <Modal
          buttons="double"
          title="투표하시겠습니까?"
          description="분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다."
          leftLabel="아니오"
          rightLabel="예"
          onClose={() => setModal(null)}
          onCancel={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}
      {modal === "alert" && (
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
