# Add SSH Key to GitHub

## Your SSH Key (RSA)
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCkzrYhFdeUJVDcliE8xvzQWSZs43oXtCbZbAIIDKg+LVqM8IEJVm0Ga1L3poI9UqPbOOJrwcvADjm1fWFnI/iBSb9MAZua5nzZ1JDGCn53Oz9YwrjN8AS5/mc43nNsdOnM/ax09AKEMQSil/MVJ9k/JNjLbkWrZcwAPnmtPNzPa4Szv1cUEtBvCBNg+ebj90gNGzIZ0dQyV0Az1iS2W5atQFtdGeQ/lkSrQFd9/uTkOkytDnPtJqpd49bdLu4geKXWxp87KhOGOIcV2KAnkLprzr7nOdy3ucgb1KSdYGRZyG77KFeQ/gb91d6b4gxpEpwLvgkZIznqvKgIedHUE5uUM0avDhMBEEFC2FBktwDV173cBCtr042vbSuOKFX9XxYG2eIUBcM2f9hA2DeeBfwiIzVjPgplTHnSyybvWgyIGVL+VXJAgJpKB1d373vmhMq99Ejehj5CfX1OFHFIbOrOuXWopS2O4A1LzgnCFI3Pnk/ltYqAgWl4LG4Bj6RYWgs= u236519824@us-phx-web768.main-hosting.eu
```

## Steps to Add to GitHub:

1. **Go to GitHub SSH Settings:**
   - Visit: https://github.com/settings/ssh/new

2. **Fill in the form:**
   - **Title:** "Hostinger Key" or "MacBook Key"
   - **Key type:** Authentication Key
   - **Key:** Paste the entire key above (starting with `ssh-rsa` and ending with the email)

3. **Click "Add SSH key"**

4. **Test the connection:**
   ```bash
   ssh -T git@github.com
   ```
   You should see: "Hi aravindmaya! You've successfully authenticated..."

5. **Then push your code:**
   ```bash
   git push origin main
   ```

## Alternative: Use Your Existing Key

You also have an `id_ed25519` key. To use that instead:

1. **View your ed25519 key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. **Add that key to GitHub instead** (same process as above)

3. **Then push:**
   ```bash
   git push origin main
   ```


