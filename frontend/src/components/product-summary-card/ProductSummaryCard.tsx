import type { JSX, ReactNode } from "react";
import "./ProductSummaryCard.css";

interface ProductSummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  badgeText?: string;
  badgeType?: "success" | "danger" | "neutral";
  bgColor?: string;
  iconColor?: string;
}

export const ProductSummaryCard = ({
  icon,
  title,
  value,
  badgeText,
  badgeType = "neutral",
  bgColor = "#F3F4F6",
  iconColor = "#374151",
}: ProductSummaryCardProps): JSX.Element => {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <div
          className="icon-container"
          style={{
            backgroundColor: bgColor,
            color: iconColor,
          }}
        >
          {icon}
        </div>

        {badgeText && (
          <span className={`badge badge-${badgeType}`}>{badgeText}</span>
        )}
      </div>

      <div className="summary-card-bottom">
        <p className="summary-title">{title.toUpperCase()}</p>
        <h2 className="summary-value">{value}</h2>
      </div>
    </div>
  );
};
