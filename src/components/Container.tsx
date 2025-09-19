interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`w-full lg:px-20 mx-auto py-10 px-4  ${className}`}>
      {children}
    </div>
  );
};

export default Container;
