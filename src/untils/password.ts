import * as bcrypt from "bcrypt";

export class Password {
  /**
   * @param data
   */
  public static async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  /**
   * @param hash
   * @param plaintext
   */
  public static async check(hash: string, plaintext: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }

  /* Function to generate combination of password */
  public static generatePassword() {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericChars = "0123456789";
    const specialChars = "!@#$%^&*()-_+=<>?";

    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    // Randomly select at least one character from each character set
    const password = [
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
      numericChars[Math.floor(Math.random() * numericChars.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    const minLength = 8;
    const maxLength = 20;

    // Generate the rest of the password within the specified length range
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    for (let i = password.length; i < passwordLength; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the characters to make the password more random
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
  }
}
