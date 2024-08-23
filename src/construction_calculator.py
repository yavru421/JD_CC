import re

def parse_measurement(input_str):
    print(f"Parsing input: {input_str}")
    regex = r'(?:(\d+)\s*ft\s*)?(?:(\d+)\s*in)?'
    match = re.match(regex, input_str.strip())
    if not match:
        print(f"Failed to parse input: {input_str}")
        return None

    feet = int(match.group(1)) if match.group(1) else 0
    inches = int(match.group(2)) if match.group(2) else 0
    total_inches = feet * 12 + inches

    print(f"Parsed {input_str} to {total_inches} inches")
    return total_inches

def format_measurement(inches):
    if inches is None:
        return 'Error in calculation'
    feet = inches // 12
    remaining_inches = inches % 12
    return f"{feet} ft {remaining_inches} in" if feet > 0 else f"{remaining_inches} in"

def handle_calculate(input1, input2, operation):
    value1 = parse_measurement(input1)
    value2 = parse_measurement(input2)

    print(f"Values parsed: {value1} inches, {value2} inches")

    if value1 is None or value2 is None:
        return 'Invalid input'

    result_in_inches = None
    if operation == '+':
        result_in_inches = value1 + value2
    elif operation == '-':
        result_in_inches = value1 - value2
    elif operation == '*':
        result_in_inches = value1 * value2
    elif operation == '/':
        if value2 != 0:
            result_in_inches = value1 / value2
        else:
            result_in_inches = None

    print(f"Operation result: {result_in_inches} inches")
    return format_measurement(result_in_inches)

if __name__ == "__main__":
    print("Construction Calculator")
    input1 = input("Enter first measurement (e.g., 1 ft 2 in): ")
    input2 = input("Enter second measurement (e.g., 2 ft 3 in): ")
    operation = input("Enter operation (+, -, *, /): ")

    result = handle_calculate(input1, input2, operation)
    print(f"Result: {result}")

