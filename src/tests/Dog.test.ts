import { beforeEach, describe, expect, test } from "vitest";
import { Dog } from "../domain/Dog";

describe("Dog class tests", () => {
  let dog: Dog;

  beforeEach(() => {
    dog = new Dog("Buddy", "Golden Retriever", 2, "Golden");
  });

  test("Dog can bark", () => {
    expect(dog.bark()).toBe("Buddy barks: Woof! Woof!");
  });

  test("New dog starts awake and with no tricks", () => {
    expect(dog.isSleeping).toBe(false);
    expect(dog.tricks).toEqual([]);
  });

  test("Dog can sleep and wake up, even if repeated", () => {
    expect(dog.sleep()).toBe("Buddy is now sleeping.");
    dog.sleep();
    expect(dog.isSleeping).toBe(true);
    expect(dog.wakeUp()).toBe("Buddy woke up.");
    dog.wakeUp();
    expect(dog.isSleeping).toBe(false);
  });

  test("Dog can learn tricks, including a repeated one", () => {
    expect(dog.learnTrick("sit")).toBe("Buddy learned a new trick: sit.");
    dog.learnTrick("sit");
    expect(dog.tricks).toEqual(["sit", "sit"]);
  });

  test("Dog cannot learn an empty, blank, null or undefined trick", () => {
    expect(() => dog.learnTrick("")).toThrow("Trick cannot be empty");
    expect(() => dog.learnTrick("   ")).toThrow("Trick cannot be empty");
    expect(() => dog.learnTrick(null as unknown as string)).toThrow(
      "Trick cannot be empty",
    );
    expect(() => dog.learnTrick(undefined as unknown as string)).toThrow(
      "Trick cannot be empty",
    );
    expect(dog.tricks).toEqual([]);
  });

  test("Dog with age 0 and empty strings displays info", () => {
    const puppy = new Dog("", "", 0, "");
    expect(puppy.getDescription()).toBe(" is a .");
    expect(puppy.displayInfo()).toBe(" is a 0 year old,  color, .");
  });

  test("Dog displays its info and description", () => {
    expect(dog.getDescription()).toBe("Buddy is a Golden Retriever.");
    expect(dog.displayInfo()).toBe(
      "Buddy is a 2 year old, Golden color, Golden Retriever.",
    );
  });
});
