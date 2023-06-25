import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as RxSelect from '@radix-ui/react-select';
import { Fragment } from 'react';

interface SelectProps {
  // TODO: Make generic
  value: any;
  displayValue: string;
  entries: any[];
  onChange: (value: string) => void;
  useValue?: string;
  name?: string;
  required?: boolean;
}

export const Select = ({
  value,
  useValue,
  displayValue,
  entries,
  onChange,
  name,
  required,
}: SelectProps) => {
  return (
    <>
      <RxSelect.Root value={value} onValueChange={onChange} required={required}>
        <RxSelect.Trigger
          aria-label={name}
          className="rounded-full inline-flex items-center focus:outline-none leading-none border-indigo-500 border-2 p-2 text-sm"
        >
          <RxSelect.Value placeholder="Select an entry..." />
          <RxSelect.Icon className="text-indigo-500 ms-2">
            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
          </RxSelect.Icon>
        </RxSelect.Trigger>
        <RxSelect.Portal>
          <RxSelect.Content className="bg-white rounded-md border-2 border-indigo-500 text-sm">
            <RxSelect.ScrollUpButton />
            <RxSelect.Viewport>
              {entries.map((entry, index) => (
                <Fragment key={useValue ? entry[useValue] : index}>
                  <RxSelect.Item
                    className="hover:bg-indigo-500 hover:text-white hover:border-0 px-6 py-2 focus:outline-none"
                    value={useValue ? entry[useValue] : entry}
                  >
                    <RxSelect.ItemText>{entry[displayValue]}</RxSelect.ItemText>
                  </RxSelect.Item>
                  <RxSelect.Separator className="h-[1px] bg-indigo-200 mx-2"></RxSelect.Separator>
                </Fragment>
              ))}
            </RxSelect.Viewport>
            <RxSelect.ScrollDownButton />
            <RxSelect.Arrow />
          </RxSelect.Content>
        </RxSelect.Portal>
      </RxSelect.Root>
    </>
  );
};
