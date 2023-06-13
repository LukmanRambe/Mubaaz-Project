type HeaderTitleProps = {
  headerTitle: string;
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({ headerTitle }) => {
  return <h1 className="text-2xl font-medium text-gray-900">{headerTitle}</h1>;
};

export default HeaderTitle;
