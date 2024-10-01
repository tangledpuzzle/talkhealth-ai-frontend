import { FC } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const StepCard: FC<StepCardProps> = ({ content, icon, nbr, title }) => {
  return (
    <Card className="">
      <CardHeader className="border-b border-b-slate-900">
        <span>Step {nbr}</span>
        {icon}
      </CardHeader>
      <CardContent>
        <span className="text-base font-semibold">{title}</span>
        <p className="text-sm tracking-wide">{content}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
