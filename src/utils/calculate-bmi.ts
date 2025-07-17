// utils/calculateBmi.ts

type Measurement = {
  value: string;
  unit: string;
};

export function calculateBmi(height: Measurement, weight: Measurement): number | null {
  const heightVal = parseFloat(height.value);
  const weightVal = parseFloat(weight.value);

  if (isNaN(heightVal) || isNaN(weightVal) || heightVal === 0) return null;

  // Convert height to meters
  let heightInMeters = heightVal;
  switch (height.unit) {
    case 'ft':
      heightInMeters = heightVal * 0.3048;
      break;
    case 'in':
      heightInMeters = heightVal * 0.0254;
      break;
    case 'cm':
      heightInMeters = heightVal / 100;
      break;
    case 'm':
      break;
    default:
      break;
  }

  // Convert weight to kg
  let weightInKg = weightVal;
  switch (weight.unit) {
    case 'lbs':
      weightInKg = weightVal * 0.453592;
      break;
    case 'st':
      weightInKg = weightVal * 6.35029;
      break;
    case 'kg':
      break;
    default:
      break;
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(1));
}
