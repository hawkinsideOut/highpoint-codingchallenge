const ErrorMessage = (error: any) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold text-red-600">Error</h1>
			<p className="text-lg">{error.message}</p>
		</div>
	);
};
export default ErrorMessage;
