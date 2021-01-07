import * as React from "react"
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { DatePicker, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/components/DatePicker";

interface Props {
  label: string
}

export const AttributeDatePicker = ({ label }: Props) => {

  const DayPickerStrings: IDatePickerStrings = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],

    days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],

    shortDays: [ "S", "M", "T", "W", "T", "F", "S" ],

    goToToday: "Go to today",
    prevMonthAriaLabel: "Go to previous month",
    nextMonthAriaLabel: "Go to next month",
    prevYearAriaLabel: "Go to previous year",
    nextYearAriaLabel: "Go to next year",
    closeButtonAriaLabel: "Close date picker",
    monthPickerHeaderAriaLabel: "{0}, select to change the year",
    yearPickerHeaderAriaLabel: "{0}, select to change the month",
  };
  const controlClass = mergeStyleSets({
    control: {
      margin: "0 0 15px 0",
      maxWidth: "100%",
    },
  });

  return (
    <div>
      <DatePicker
        className={ controlClass.control }
        firstDayOfWeek={ DayOfWeek.Sunday }
        label={ label }
        strings={ DayPickerStrings }
        showMonthPickerAsOverlay={ true }
        placeholder="Select a date..."
        ariaLabel="Select a date" />
    </div>
  )
}