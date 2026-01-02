interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-base-100">
      <div className="card w-full max-w-sm min-h-[560px] bg-white border border-gray-200 shadow-md rounded-xl">
        <div className="card-body p-8 flex flex-col justify-center w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
