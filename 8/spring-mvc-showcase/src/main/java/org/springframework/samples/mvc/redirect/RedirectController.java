package org.springframework.samples.mvc.redirect;

import java.util.*;

import javax.inject.Inject;

import org.joda.time.LocalDate;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Controller;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.*;

@Controller
@RequestMapping("/redirect")
public class RedirectController {
	
	private final ConversionService conversionService;

	@Inject
	public RedirectController(ConversionService conversionService) {
		this.conversionService = conversionService;
	}

	@RequestMapping(value="/uriTemplate", method=RequestMethod.GET)
	public String uriTemplate(RedirectAttributes redirectAttrs) {
		redirectAttrs.addAttribute("account", "a123");  // Used as URI template variable
		redirectAttrs.addAttribute("date", new LocalDate(2011, 12, 31));  // Appended as a query parameter
		return "redirect:/redirect/{account}";
	}

	@RequestMapping(value="/uriComponentsBuilder", method=RequestMethod.GET)
	public String uriComponentsBuilder() {
		String date = this.conversionService.convert(new LocalDate(2011, 12, 31), String.class);
		String date1 = this.conversionService.convert(new LocalDate(2012, 12, 31), String.class);
		String[] dts = new String[]{date, date1};
		UriComponents redirectUri = UriComponentsBuilder.fromPath("/redirect/{account}").queryParam("date", date, date1).build().expand("a123").encode();
		System.out.println(redirectUri);
		
		MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
		mvm.put("dts", Arrays.asList(date, date1));
		mvm.put("empty", Collections.EMPTY_LIST);
		
		UriComponents redirectUri1 = UriComponentsBuilder.fromPath("/redirect/{account}").queryParam("date", dts).queryParams(mvm).build().expand("a123").encode();
		System.out.println(redirectUri1);
		
		UriComponents redirectUri2 = UriComponentsBuilder.fromPath("/redirect/{account}").queryParam("date", null).build().expand("a123").encode();
		System.out.println(redirectUri2);
		
		return "redirect:" + redirectUri.toUriString();
	}

	@RequestMapping(value="/{account}", method=RequestMethod.GET)
	public String show(@PathVariable String account, @RequestParam(required=false) LocalDate date) {
		return "redirect/redirectResults";
	}

}
