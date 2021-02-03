import Moment from "moment";

export const providerOptions = data => {
  let array = [];
  data.sort(function(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  for (let index = 0; index < data.length; index++) {
    array.push({
      value: data[index].email,
      label: data[index].name,
      id: data[index].providerId
    });
  }
  return array;
};
export const typeOfSurgery = [
  {
    value: "Orthopedic Joint Surgery",
    label: "Orthopedic Joint Surgery"
  },
  { value: "Spine Surgery", label: "Spine Surgery" }
];

export const areaOfSurgerySpine = [
  {
    value: "Cervical",
    label: "Cervical"
  },
  { value: "Thoracic", label: "Thoracic" },
  {
    value: "Lumbar",
    label: "Lumbar"
  },
  { value: "Multiple", label: "Multiple" }
];

export const areaOfSurgeryOrtho = [
  {
    value: "Hip",
    label: "Hip"
  },
  { value: "Knee", label: "Knee" },
  {
    value: "Other Extremity",
    label: "Other Extremity"
  }
];

export const aggregateFreqOptions = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
  {
    value: "year",
    label: "Yearly"
  }
];

export const baselineAggregateFreqOptions = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  {
    value: "year",
    label: "Year"
  }
];

export const dateOptions = data => {
  let array = [];

  data.surgeryDetails.sort(function(a, b) {
    if (a.surgeryDate < b.surgeryDate) {
      return -1;
    }
    if (a.surgeryDate > b.surgeryDate) {
      return 1;
    }
    return 0;
  });

  for (let index = 0; index < data.surgeryDetails.length; index++) {
    array.push({
      value: Moment(data.surgeryDetails[index].surgeryDate).format(
        "YYYY-MM-DD"
      ),
      label: Moment(data.surgeryDetails[index].surgeryDate).format("MM-DD-YYYY")
    });
  }
  return array;
};
