"use client";

import { useEffect } from "react";

import Button from "@/components/common/Button";

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  onCancel,
  onConfirm,
}: LogoutModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="logout-modal-backdrop"
      role="presentation"
      onMouseDown={onCancel}
    >
      <section
        className="logout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="logout-modal-content">
          <div className="logout-modal-inner">
            <div className="logout-modal-top">
              <div className="logout-modal-copy">
                <h2
                  id="logout-modal-title"
                  className="text-t20-semibold logout-modal-title"
                >
                  로그아웃 하시겠습니까?
                </h2>
                <p
                  id="logout-modal-description"
                  className="text-sub14-med logout-modal-description"
                >
                  현재 계정에서 로그아웃됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="logout-modal-action-container">
          <div className="logout-modal-actions">
            <Button
              label="취소하기"
              styleType="quaternary"
              size="large"
              className="logout-modal-button logout-modal-cancel-button bg-gray-1 hover:bg-gray-1 active:bg-gray-1"
              onClick={onCancel}
            />
            <Button
              label="로그아웃하기"
              styleType="secondary"
              size="large"
              className="logout-modal-button bg-gray-8"
              onClick={onConfirm}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
