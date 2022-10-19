import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React from 'react';

interface ConfirmCheckboxProps {
  onChecked: (val: boolean) => void;
}

export const ConfirmCheckbox: React.FC<ConfirmCheckboxProps> = ({
  onChecked
}) => {
  const onChange = (e: CheckboxChangeEvent) => {
    onChecked(e.target.checked);
  };

  return (
    <div className="text-left md:px-16">
      <Checkbox onChange={onChange} className="text-content">
        I confirm that I've revoked all approvals for Rabby Swap, and further
        loss caused by uncanceled approvals will not be qualified for a claim
      </Checkbox>
    </div>
  );
};
