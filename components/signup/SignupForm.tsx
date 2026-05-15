'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [userType, setUserType] = useState<'프론트엔드' | '백엔드'>(
    '프론트엔드'
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-4 mb-5">
        <button className={`w-88 h-15 cursor-pointer rounded-lg ${userType === '프론트엔드' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setUserType('프론트엔드')}>
          프론트엔드
        </button>
        <button className={`w-88 h-15 cursor-pointer rounded-lg ${userType === '백엔드' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setUserType('백엔드')}>
          백엔드
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <input
          name="name"
          type="text"
          placeholder="이름"
          required
          className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
        />
        <input
          name="ID"
          type="text"
          placeholder="아이디"
          required
          className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          required
          className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
        />

        <button
          type="submit"
          className="w-100 h-23 px-35 bg-primary text-white text-heading p-2 rounded-lg disabled:bg-gray-400 font-semibold"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
