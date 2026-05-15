'use client';

export default function LoginForm() {
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const id = formData.get('id');
        const password = formData.get('password');
    };

    return (
        <form className="flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
            <input name="id" type="text" className="flex items-center w-130 h-13 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400" placeholder="아이디를 입력해주세요"/>
            <input name="password" type="password" className="flex items-center w-130 h-13 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400" placeholder="비밀번호를 입력해주세요"/>
            <button type="submit" className="w-100 h-15 px-35 bg-primary text-white text-heading rounded-lg disabled:bg-gray-400 font-semibold">로그인</button>
        </form>
    )
}