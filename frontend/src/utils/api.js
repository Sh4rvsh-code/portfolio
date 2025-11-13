// Backend functionality removed - static frontend only

export const fetchProjects = async () => {
  // Return empty array since projects are now hardcoded in components
  return [];
};

export const submitContact = async (formData) => {
  // Simulate successful contact form submission
  console.log('Contact form submitted:', formData);
  return { success: true, message: 'Thank you for your message! I will get back to you soon.' };
};

export const trackVisit = async () => {
  // No analytics tracking
  return { success: true };
};

export default {
  fetchProjects,
  submitContact,
  trackVisit,
};
