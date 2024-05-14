type Title = {
  title: string;
};

export default function FormBtn({ title }: Title) {
  return (
    <div className="mt-6 text-center">
      <button className="px-2 py-1 bg-blue-600 rounded-sm" type="submit">
        {title}
      </button>
    </div>
  );
}
