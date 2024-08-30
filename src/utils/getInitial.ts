function getInitials(name: string): string {
  return name
    .split(" ") // Split the string into an array of words
    .map((word) => word[0]) // Get the first letter of each word
    .join("") // Join the initials together
    .toUpperCase(); // Convert to uppercase (optional)
}

export default getInitials;
