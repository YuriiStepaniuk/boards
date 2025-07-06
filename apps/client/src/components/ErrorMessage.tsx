interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Something went wrong.',
}) => {
  return (
    <div className="text-center py-10 text-red-600 font-semibold">
      {message}
    </div>
  );
};

export default ErrorMessage;
