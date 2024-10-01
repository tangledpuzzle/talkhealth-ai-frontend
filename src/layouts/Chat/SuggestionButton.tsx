export default function SuggestionButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      type="button"
      
      className={`outline-none rounded-full border border-gpt-green-dark text-center px-3 py-0.5 text-gpt-green-dark font-medium bg-gpt-subtle text-xs sm:text-base hover:bg-gpt-green-light duration-300 transition-colors`}
    >
      {children}
    </button>
  );
}

