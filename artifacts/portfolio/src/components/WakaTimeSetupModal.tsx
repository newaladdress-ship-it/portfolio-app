import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HiX, HiCheck } from "react-icons/hi";
import { SiWakatime } from "react-icons/si";

interface WakaTimeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySubmit: (apiKey: string) => Promise<boolean>;
}

export default function WakaTimeSetupModal({ isOpen, onClose, onApiKeySubmit }: WakaTimeSetupModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError("Please paste your API key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await onApiKeySubmit(apiKey.trim());
      if (success) {
        setSuccess(true);
        setApiKey("");
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError("Failed to save API key. Please try again.");
      }
    } catch (err) {
      setError("Error saving API key. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <SiWakatime className="text-2xl text-blue-500" />
            <div>
              <DialogTitle>Add WakaTime API Key</DialogTitle>
              <DialogDescription>
                Connect your WakaTime account to display your coding activity
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {success ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <HiCheck className="text-2xl text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
              API key saved successfully! Your coding stats will appear shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                WakaTime API Key
              </label>
              <textarea
                id="apiKey"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError("");
                }}
                placeholder="Paste your WakaTime API key here..."
                className="w-full h-24 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Get your API key from{" "}
                <a
                  href="https://wakatime.com/settings/api-key"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  wakatime.com/settings/api-key
                </a>
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 flex gap-2">
                <HiX className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !apiKey.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? "Saving..." : "Save API Key"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
