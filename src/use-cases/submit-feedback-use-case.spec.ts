import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMain: sendMailSpy }
);

describe("Submit feedback", (): void => {
  it("should be able to submit a feedback", async (): Promise<void> => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async (): Promise<void> => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async (): Promise<void> => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with invalid screenshot", async (): Promise<void> => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "ta tudo bugado",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
