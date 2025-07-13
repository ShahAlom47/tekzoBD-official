"use client";
import React from "react";
import CustomModal from "./CustomModal";

interface LoginMsgModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginMsgModal: React.FC<LoginMsgModalProps> = ({ open, setOpen }) => {
  return (
    <CustomModal
      open={open}
      onOpenChange={setOpen}
      title="Login Required"
      description="You need to login first to use this feature."
    >
      {/* Modal body content */}
      <div className="py-4">Please log in to continue.</div>
      {/* Optionally, you can add buttons here to redirect user to login page */}
    </CustomModal>
  );
};

export default LoginMsgModal;
