import { ReactElement } from "react";

interface PrimaryCardProps {
  headerContent: ReactElement;
  content: ReactElement;
  footerContent?: ReactElement;
}

const PrimaryCard = ({
  headerContent,
  content,
  footerContent,
}: PrimaryCardProps) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 sm:px-6">{headerContent}</div>
      <div className="px-4 py-5 sm:p-6">{content}</div>
      <div className="px-4 sm:px-6">{footerContent}</div>
    </div>
  );
};

export default PrimaryCard;
