
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const IncidentReport = () => {
  const [incidentType, setIncidentType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!incidentType || !location || !description) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Incident reported successfully");
      setIncidentType('');
      setLocation('');
      setDescription('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="safety-card">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-transit-orange" />
          <h2>Report an Incident</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="incidentType">Incident Type</Label>
            <Select 
              value={incidentType} 
              onValueChange={setIncidentType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault or Battery</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                <SelectItem value="drugs">Drug Use</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Station or bus route/stop"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-transit-blue hover:bg-transit-lightBlue"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            For emergencies, call 911. This report will be sent to CTA safety team.
          </p>
        </div>
      </form>
    </div>
  );
};

export default IncidentReport;
