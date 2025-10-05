import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, User, Phone, Tractor } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupData, setSignupData] = useState({
    fullName: '',
    phone: '',
    email: '',
    farmName: '',
    password: '',
    stakeholder: 'farmer' as 'farmer' | 'veterinarian' | 'government_officer' | 'policymaker'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast.success(t('auth.signInSuccess'));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
            farm_name: signupData.farmName,
            stakeholder: signupData.stakeholder
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;

      // Insert the stakeholder role
      if (data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: signupData.stakeholder
          });
        
        if (roleError) {
          console.error('Role assignment error:', roleError);
        }
      }

      if (error) throw error;

      toast.success(t('auth.signUpSuccess'));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-16 w-16 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">BioSecure India</h1>
              <p className="text-lg text-muted-foreground">Farm Biosecurity Portal</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight">
              {t('auth.protectFarm')} <span className="text-primary">{t('auth.aiPoweredBio')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('auth.joinFarmers')}
            </p>
            <div className="space-y-3 pt-4">
              {[
                "AI-driven risk assessments",
                "Expert video training courses",
                "Real-time disease outbreak alerts",
                "Gamified compliance tracking",
                "Digital health passport"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-xs text-muted-foreground">Farms Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-xs text-muted-foreground">Expert Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-xs text-muted-foreground">Compliance Rate</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 md:hidden items-center gap-2">
              <Shield className="h-12 w-12 text-primary" />
              <LanguageSwitcher />
            </div>
            <CardTitle className="text-2xl">{t('auth.welcomeBack')}</CardTitle>
            <CardDescription>{t('auth.signInAccess')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
                <TabsTrigger value="signup">{t('auth.signup')}</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="farmer@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{t('auth.rememberMe')}</span>
                    </label>
                    <a href="#" className="text-primary hover:underline">{t('auth.forgotPassword')}</a>
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? t('auth.signingIn') : t('auth.login')}
                  </Button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('auth.signInWithOTP')}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t('auth.fullName')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">{t('auth.phone')}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        placeholder="+91 9876543210"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        placeholder="farmer@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="signup-farm">{t('auth.farmName')}</Label>
                    <div className="relative">
                      <Tractor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-farm"
                        type="text"
                        value={signupData.farmName}
                        onChange={(e) => setSignupData({...signupData, farmName: e.target.value})}
                        placeholder="Your farm name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-stakeholder">{t('auth.stakeholder')}</Label>
                    <select
                      id="signup-stakeholder"
                      value={signupData.stakeholder}
                      onChange={(e) => setSignupData({...signupData, stakeholder: e.target.value as any})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="farmer">{t('auth.farmer')}</option>
                      <option value="veterinarian">{t('auth.veterinarian')}</option>
                      <option value="government_officer">{t('auth.governmentOfficer')}</option>
                      <option value="policymaker">{t('auth.policymaker')}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        placeholder="Create a strong password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" required className="mt-0.5 rounded" />
                    <span className="text-muted-foreground">
                      {t('auth.termsAgree')}
                    </span>
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? t('auth.creatingAccount') : t('auth.signup')}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p className="mt-1">{t('auth.needHelp')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
