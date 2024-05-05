'use client'
import {useState} from "react";
import {askQuestion} from "@/utils/api";

const Question = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const answer = await askQuestion(value);
        setResponse(answer);
        setValue('');
        setLoading(false);
    }
    console.log(response.data);
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="mb-6">
                <input
                    disabled={loading}
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="Ask a question"
                    className="border border-black/20 px-4 py-2 rounded-lg"
                />
                <button
                        disabled={loading}
                    type="submit"
                    className="ml-2 bg-gradient-to-br from-indigo-700 to-blue-500 py-2 px-4 rounded-lg font-semibold text-emerald-950 text-white">
                    Ask
                </button>
            </form>
            {loading && <div>...loading</div>}
            {response && <p>{response.data}</p>}
        </div>
    )
}

export default Question