"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, getStoredToken, type User } from "@/lib/auth";
import { DEPARTMENTS, COUNTRIES, EMPTY_PROFILE, type ProfileFormData } from "@/lib/constants";
import OrcidButton from "@/components/ui/orcid-button";

import ScrollReveal from "@/components/ui/scroll-reveal";
import TypingEffect from "@/components/ui/typing-effect";
import Ambient3D from "@/components/ui/ambient-3d";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(EMPTY_PROFILE);
  const [fieldsInput, setFieldsInput] = useState("");

  useEffect(() => {
    fetchCurrentUser()
      .then((u) => {
        setUser(u);
        if (u) {
          // Template: in real app, we would fetch existing profile from DB here
          // and fallback to OpenAlex if DB is empty.
          setFormData({
            ...EMPTY_PROFILE,
            name: u.name || "",
            givenName: u.given_name || "",
            familyName: u.family_name || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addField = () => {
    if (fieldsInput.trim() && !formData.researchFields.includes(fieldsInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        researchFields: [...prev.researchFields, fieldsInput.trim()],
      }));
      setFieldsInput("");
    }
  };

  const removeField = (fieldToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      researchFields: prev.researchFields.filter((f) => f !== fieldToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = getStoredToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/auth/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to save profile");
      }
      
      router.push("/account");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-[70vh] flex justify-center mt-20"><div className="w-8 h-8 border-4 border-academic-accent border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="relative overflow-hidden min-h-[70vh] flex items-center justify-center px-4">
        <Ambient3D variant="a" />
        <ScrollReveal>
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-academic-accent/10 text-academic-accent flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <TypingEffect as="h1" text="Authentication Required" className="text-2xl font-bold font-serif text-academic-primary mb-3" showCursor={false} />
            <p className="text-sm text-academic-muted mb-6 mt-2">
              Sign in with your ORCID iD to edit your researcher profile.
            </p>
            <OrcidButton size="lg" />
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8">
      <Ambient3D variant="c" />
      <ScrollReveal direction="down">
        <div className="mb-8">
          <TypingEffect as="h1" text="Edit Profile" className="text-2xl md:text-3xl font-bold font-serif text-academic-primary mb-2" showCursor={false} />
          <p className="text-sm text-academic-muted">
            Update your public researcher information. Data is saved securely to our platform.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={150}>
        <form onSubmit={handleSubmit} className="surface-card rounded-2xl shadow-3d shadow-inner-3d p-6 md:p-8 space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-academic-primary border-b border-academic-border pb-2">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field shadow-inner-3d w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
                ORCID iD
              </label>
              <input
                type="text"
                disabled
                value={user.orcid_id}
                className="input-field shadow-inner-3d w-full bg-academic-bg opacity-70 cursor-not-allowed"
              />
              <p className="text-[10px] text-academic-muted mt-1">
                Synced from your ORCID account automatically.
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
              Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              rows={4}
              placeholder="A brief overview of your research career..."
              className="input-field shadow-inner-3d w-full resize-y"
            />
          </div>
        </div>

        {/* Academic Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-academic-primary border-b border-academic-border pb-2">
            Academic Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
                Institution
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="e.g. Stanford University"
                className="input-field shadow-inner-3d w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="input-field shadow-inner-3d w-full"
              >
                <option value="">Select a department...</option>
                {DEPARTMENTS.filter(d => d !== "All Departments").map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-1.5">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="input-field shadow-inner-3d w-full"
              >
                <option value="">Select country...</option>
                {COUNTRIES.filter(c => c !== "All Countries").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Research Fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-academic-primary border-b border-academic-border pb-2">
            Research Fields
          </h3>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.researchFields.map((field) => (
                <span key={field} className="badge badge-accent shadow-sm py-1.5 px-3 flex items-center gap-1">
                  {field}
                  <button
                    type="button"
                    onClick={() => removeField(field)}
                    className="text-academic-accent hover:opacity-80 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
              {formData.researchFields.length === 0 && (
                <span className="text-sm text-academic-muted italic">No fields added yet.</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={fieldsInput}
                onChange={(e) => setFieldsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addField();
                  }
                }}
                placeholder="Add a field (e.g. Machine Learning)"
                className="input-field shadow-inner-3d flex-1"
              />
              <button
                type="button"
                onClick={addField}
                className="btn-secondary btn-3d shadow-3d px-4 rounded-xl text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-academic-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/account")}
            className="px-6 py-2.5 text-sm font-medium text-academic-muted hover:text-academic-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary btn-3d shadow-3d px-8 py-2.5 rounded-xl text-sm disabled:opacity-70 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "💾 Save Profile"
            )}
          </button>
        </div>
      </form>
      </ScrollReveal>
    </div>
  );
}
