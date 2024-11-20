// Stepper object to handle scroll navigation
const stepper = {
    currentStep: 1, // Track the current step
    totalSteps: 4,  // Total number of steps
    isScrolling: false, // Prevent multiple scroll events in a short time
  
    // Initialize the stepper
    init() {
      this.updateUI();
      this.addScrollEvent();
    },
  
    // Update the UI based on the current step
    updateUI() {
      // Hide all step content
      const contents = document.querySelectorAll('.stepper-content');
      contents.forEach(content => {
        content.classList.remove('active');
      });
  
      // Show the current step content
      const activeContent = document.querySelector(`.stepper-content[stepper-label="${this.currentStep}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
  
      // Highlight the active step in the navigation
      const steps = document.querySelectorAll('.step');
      steps.forEach(step => {
        step.classList.remove('active');
      });
  
      const activeStep = document.getElementById(`step-${this.currentStep}`);
      if (activeStep) {
        activeStep.classList.add('active');
      }
    },
  
    // Add scroll event to handle step navigation
    addScrollEvent() {
      const stepperContainer = document.querySelector('.stepper-content-container');
  
      stepperContainer.addEventListener('wheel', (e) => {
        if (this.isScrolling) return;
  
        this.isScrolling = true;
  
        // If scrolling down (next step)
        if (e.deltaY > 0) {
          if (this.currentStep < this.totalSteps) {
            this.currentStep++;
          }
        }
  
        // If scrolling up (previous step)
        if (e.deltaY < 0) {
          if (this.currentStep > 1) {
            this.currentStep--;
          }
        }
  
        // Update the UI after scroll
        this.updateUI();
  
        // Reset scroll flag after animation delay
        setTimeout(() => {
          this.isScrolling = false;
        }, 600); // Delay to match transition duration
      });
    }
  };
  
  // Initialize the stepper when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    stepper.init();
  });
  