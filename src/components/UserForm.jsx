import { useState, useEffect } from 'react';
import { validateUserForm, hasErrors } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', department: '' };

const Field = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const inputClass = (hasError) =>
  `w-full bg-slate-800 border ${hasError ? 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500/50' : 'border-slate-700 focus:ring-violet-500/50 focus:border-violet-500/50'} text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:ring-2 transition-all duration-200`;

const UserForm = ({ isOpen, editUser, onSubmit, onClose }) => {
  const [formData, setFormData]   = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        editUser
          ? { firstName: editUser.firstName, lastName: editUser.lastName, email: editUser.email, department: editUser.department }
          : EMPTY_FORM
      );
      setErrors({});
      setSubmitError(null);
    }
  }, [editUser, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validateUserForm(formData);
    if (hasErrors(ve)) { setErrors(ve); return; }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setSubmitError(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isEdit = Boolean(editUser);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget && !submitting) onClose(); }}
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-lg animate-slideUp overflow-hidden">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className={`relative px-6 py-5 border-b border-slate-700/50 ${isEdit ? 'bg-gradient-to-r from-indigo-900/30 to-slate-900' : 'bg-gradient-to-r from-violet-900/30 to-slate-900'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isEdit ? 'bg-indigo-500/20' : 'bg-violet-500/20'}`}>
              {isEdit ? (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit User' : 'Add New User'}</h2>
              <p className="text-sm text-slate-400">
                {isEdit ? `Editing ${editUser.firstName} ${editUser.lastName}` : 'Fill in the details below to create a new team member.'}
              </p>
            </div>
          </div>
          {/* Close button */}
          {!submitting && (
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Submit error ─────────────────────────────────────────────── */}
        {submitError && (
          <div className="mx-6 mt-4 flex items-center gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {submitError}
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <Field id="form-firstName" label="First Name" error={errors.firstName}>
              <input
                id="form-firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                className={inputClass(errors.firstName)}
              />
            </Field>
            <Field id="form-lastName" label="Last Name" error={errors.lastName}>
              <input
                id="form-lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
                className={inputClass(errors.lastName)}
              />
            </Field>
          </div>

          {/* Email */}
          <Field id="form-email" label="Email Address" error={errors.email}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="form-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.doe@company.com"
                className={`${inputClass(errors.email)} pl-10`}
              />
            </div>
          </Field>

          {/* Department */}
          <Field id="form-department" label="Department" error={errors.department}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <select
                id="form-department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className={`${inputClass(errors.department)} pl-10 cursor-pointer`}
              >
                <option value="">Select a department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </Field>

          {/* ── Footer actions ──────────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              id="form-submit-btn"
              type="submit"
              disabled={submitting}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                isEdit
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/20'
              }`}
            >
              {submitting && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting ? 'Saving…' : isEdit ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UserForm;
