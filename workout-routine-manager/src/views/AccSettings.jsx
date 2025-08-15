import { Box, Typography, Card, useTheme, TextField, Button, Alert, Divider, Stack } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/supabase-client";

export default function AccSettings() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  
  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    password: ""
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const handleEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: emailForm.password
      });
      
      if (signInError) {
        setMessage({ type: "error", text: "Current password is incorrect" });
        return;
      }
      
      // Update the email
      const { error: updateError } = await supabase.auth.updateUser({
        email: emailForm.newEmail
      });
      
      if (updateError) {
        setMessage({ type: "error", text: updateError.message });
      } else {
        setMessage({ type: "success", text: "Email update initiated. Please check your new email for confirmation." });
        setEmailForm({ newEmail: "", password: "" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while updating email" });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      setLoading(false);
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters long" });
      setLoading(false);
      return;
    }
    
    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordForm.currentPassword
      });
      
      if (signInError) {
        setMessage({ type: "error", text: "Current password is incorrect" });
        return;
      }
      
      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });
      
      if (updateError) {
        setMessage({ type: "error", text: updateError.message });
      } else {
        setMessage({ type: "success", text: "Password updated successfully!" });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while updating password" });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        Account Settings
      </Typography>
      
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}
      
      <Stack spacing={3}>
        {/* Email Change Section */}
        <Card 
          sx={{ 
            p: 3, 
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Change Email Address
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Current email: {user?.email}
          </Typography>
          
          <Box component="form" onSubmit={handleEmailChange}>
            <Stack spacing={2}>
              <TextField
                label="New Email Address"
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                required
                fullWidth
                disabled={loading}
              />
              <TextField
                label="Current Password"
                type="password"
                value={emailForm.password}
                onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                required
                fullWidth
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !emailForm.newEmail || !emailForm.password}
                sx={{ alignSelf: 'flex-start' }}
              >
                {loading ? "Updating..." : "Update Email"}
              </Button>
            </Stack>
          </Box>
        </Card>
        
        <Divider />
        
        {/* Password Change Section */}
        <Card 
          sx={{ 
            p: 3, 
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Ensure your new password is at least 6 characters long.
          </Typography>
          
          <Box component="form" onSubmit={handlePasswordChange}>
            <Stack spacing={2}>
              <TextField
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                fullWidth
                disabled={loading}
              />
              <TextField
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                fullWidth
                disabled={loading}
                helperText="Minimum 6 characters"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
                fullWidth
                disabled={loading}
                error={passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword}
                helperText={passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword ? "Passwords do not match" : ""}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                sx={{ alignSelf: 'flex-start' }}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}