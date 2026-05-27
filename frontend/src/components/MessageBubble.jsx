export default function MessageBubble({
    role,
    content
}) {
    const isUser = 
        role === "user";

    return (

        <div 
            className={`max-w-[80%] p-4 rounded-xl mb-4 ${
                isUser
                    ? "bg-cyan-500 ml-auto"
                    : "bg-slate-700"
            }`}
        >

            <p className="text-sm font-bold mb-2">
                {isUser ? "You" : "AI"}
            </p>

            <p>{content}</p>

        </div>

    );
}